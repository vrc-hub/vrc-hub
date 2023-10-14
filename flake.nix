{
  description = "A cross-platform all-in-one package for VRChat utilities and enhancements.";

  inputs.nixpkgs.url = "github:nixos/nixpkgs";

  outputs = {
    self,
    nixpkgs,
  }: let
    forAllSystems = nixpkgs.lib.genAttrs [
      "aarch64-linux"
      "i686-linux"
      "x86_64-linux"
      "aarch64-darwin"
      "x86_64-darwin"
    ];
  in {
    formatter = forAllSystems (system: nixpkgs.legacyPackages.${system}.alejandra);

    devShell = forAllSystems (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      libs = with pkgs; [
        webkitgtk
        gtk3
        cairo
        gdk-pixbuf
        glib
        dbus
        openssl_3
        librsvg
      ];
    in
      pkgs.mkShell {
        nativeBuildInputs = with pkgs; [pkg-config];
        buildInputs = with pkgs; [
          curl
          wget
          dbus
          openssl_3
          glib
          gtk3
          libsoup
          webkitgtk
          librsvg
        ];

        GIO_MODULE_DIR = "${pkgs.glib-networking}/lib/gio/modules/";
        shellHook = ''
          export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath libs}:$LD_LIBRARY_PATH"
          unset WAYLAND_DISPLAY
        '';
      });
  };
}
