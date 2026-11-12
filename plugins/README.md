# plugins/

Sources of the official plugins that live in this repository, one folder per
crate (`plugins/<crate>/`).

A native plugin only loads in the exact editor build it was compiled for (same
sources, compiler, `Cargo.lock`, features, target, profile). So a plugin is never
built on its own here: the release workflow checks out OrbitEngine at the editor
tag, **copies each `plugins/<crate>/` folder into the engine workspace's
`plugins/` folder** (a workspace member there) and builds it with the engine's
toolchain and lock file, next to the editor. That is why the crates use workspace
dependencies:

```toml
[package]
name = "acme_hello_plugin"
version = "0.1.0"
edition.workspace = true
rust-version.workspace = true
publish = false

[lib]
crate-type = ["cdylib"]

[dependencies]
orbit_editor_sdk.workspace = true   # never another version of egui / the API
```

plus a `manifest.ron` (id, name, description, author, library) and optional
`locales/` and `assets/` folders. See `examples/editor_plugins/hello` in the
engine repository for a complete example.

To try a plugin locally: copy its folder into `<OrbitEngine>/plugins/`, then
`cargo build -p orbit_editor --release` and `cargo xtask plugins --only <crate>`.

AI Studio (`orbit.ai_studio`) is official but its source stays in the engine
repository (`plugins/orbit_ai_studio_plugin`, tied to the `orbit_ai_studio`
crate); the release workflow builds it from there.

---

Sources des plugins officiels hébergés dans ce dépôt, un dossier par crate. Un
plugin natif ne se charge que dans le build exact de l'éditeur pour lequel il a été
compilé : la CI copie chaque dossier dans `plugins/` du workspace OrbitEngine (au
tag de l'éditeur) et le compile avec la toolchain et le `Cargo.lock` du moteur.
AI Studio reste dans le dépôt du moteur.
