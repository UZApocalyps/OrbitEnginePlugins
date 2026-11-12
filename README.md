# OrbitEngine Plugins

English | [Français](#orbitengine-plugins-fr)

Official plugin catalog of [OrbitEngine](https://github.com/UZApocalyps/OrbitEngine), the visual-novel engine. Plugins published here are **Official**: built from source in this repository by CI and signed by the OrbitEngine team.

Website (plugin explorer): <https://uzapocalyps.github.io/OrbitEnginePlugins/>

## Install a plugin

* **From the editor (recommended)**: **Tools > Extensions > Plugins… > Store** tab, search, press Install, restart the editor. The editor verifies the SHA-256 and the signature.
* **From a file**: download a `.orbitplugin` from the website or from a GitHub release, then **Tools > Extensions > Plugins… > Installed > Install from a file…**.

## Compatibility

A native plugin only loads in the **exact editor build** it was compiled for (editor build id, `fingerprint` in the catalog). The store only offers builds that match your editor, and says "no build for your editor version" otherwise.

## Trust model

| Trust | When | Builds accepted |
|---|---|---|
| **Official** | the built-in source (this repository's `index.json`) | only with a valid signature by the official key embedded in the editor |
| **Trusted** | a source added with a public key | only with a valid signature by that key |
| **Unsigned** | a source added without a key | signature ignored, SHA-256 and size still checked; red warning before each install |

Ids starting with `orbit.` are only accepted from the official source. An installed plugin is only updated from the source it was installed from.

Official public key (Ed25519): `981061d013fdb4e88bf2a2a8ff2df54564cf159a7a926dafb4db102939022b43`

## Repository layout

```
index.json                 the catalog (schema 1), updated by the release workflow
plugins/<crate>/           plugin sources; CI copies them into the OrbitEngine workspace `plugins/` folder
site/                      static GitHub Pages plugin explorer (no build step)
.github/workflows/release.yml   "Release plugins": build, sign, publish, update index.json
.github/workflows/pages.yml     deploys site/ (with index.json) to GitHub Pages
```

AI Studio's source currently lives in the engine repository, at `plugins/orbit_ai_studio_plugin`.

## How a release works

1. Once: `cargo xtask plugin-key gen` (in the engine repo) writes the private key outside any repository and prints the public key. Put the key file's content in the secret `ORBIT_PLUGIN_SIGNING_KEY` of this repository; the public key is embedded in the editor (`OFFICIAL_PUBLIC_KEY`).
2. Run the workflow **Release plugins** with the editor tag as input (e.g. `v0.4.0`). It checks out OrbitEngine at that tag, copies `plugins/*` into the engine workspace, builds the editor and the plugins with the engine's toolchain and `Cargo.lock` (Windows and Linux), signs them, uploads the `.orbitplugin` files to a GitHub release and commits the updated `index.json`.
3. The site is redeployed and the editors see the new version at their next catalog refresh.

Full details: [docs/plugin-store.md](https://github.com/UZApocalyps/OrbitEngine/blob/master/docs/plugin-store.md).

## Contribute a plugin

Open a pull request adding `plugins/<crate>/` with:

* a `Cargo.toml` that uses the workspace dependencies and depends on `orbit_editor_sdk`;
* a `manifest.ron`.

Maintainers review the code before any release: official builds are signed, so merged code runs on users' machines.

## Host your own catalog

Any repository with an `index.json` in the documented format and its `.orbitplugin` files (GitHub releases or any HTTPS host) works. Generate a key with `cargo xtask plugin-key gen --out <file>`, sign with `--sign <file>`, publish the public key. Users add your repository URL in **Tools > Extensions > Plugins… > Sources** (with the key: Trusted; without: Unsigned, with a warning).

## License

TODO: license not chosen yet (see `LICENSE-TODO.md`).

---

<a id="orbitengine-plugins-fr"></a>

# OrbitEngine Plugins (FR)

[English](#orbitengine-plugins) | Français

Catalogue officiel de plugins d'[OrbitEngine](https://github.com/UZApocalyps/OrbitEngine), le moteur de visual novels. Les plugins publiés ici sont **Officiels** : compilés depuis les sources de ce dépôt par la CI et signés par l'équipe OrbitEngine.

Site web (explorateur de plugins) : <https://uzapocalyps.github.io/OrbitEnginePlugins/>

## Installer un plugin

* **Depuis l'éditeur (recommandé)** : **Outils > Extensions > Plugins… > onglet Store**, cherchez, cliquez sur Installer, redémarrez l'éditeur. L'éditeur vérifie le SHA-256 et la signature.
* **Depuis un fichier** : téléchargez un `.orbitplugin` depuis le site ou une release GitHub, puis **Outils > Extensions > Plugins… > Installés > Installer depuis un fichier…**.

## Compatibilité

Un plugin natif ne se charge que dans le **build exact de l'éditeur** pour lequel il a été compilé (identifiant de build, `fingerprint` dans le catalogue). Le store n'affiche que les builds correspondant à votre éditeur, sinon « aucun build pour votre version de l'éditeur ».

## Modèle de confiance

| Confiance | Quand | Builds acceptés |
|---|---|---|
| **Officiel** | la source intégrée (`index.json` de ce dépôt) | uniquement avec une signature valide de la clé officielle intégrée à l'éditeur |
| **De confiance (Trusted)** | une source ajoutée avec une clé publique | uniquement avec une signature valide de cette clé |
| **Non signé (Unsigned)** | une source ajoutée sans clé | signature ignorée, SHA-256 et taille vérifiés ; avertissement rouge avant chaque installation |

Les ids commençant par `orbit.` ne sont acceptés que depuis la source officielle. Un plugin installé n'est mis à jour que depuis la source d'où il a été installé.

Clé publique officielle (Ed25519) : `981061d013fdb4e88bf2a2a8ff2df54564cf159a7a926dafb4db102939022b43`

## Organisation du dépôt

```
index.json                 le catalogue (schéma 1), mis à jour par le workflow de release
plugins/<crate>/           sources des plugins ; la CI les copie dans le dossier `plugins/` du workspace OrbitEngine
site/                      explorateur de plugins statique pour GitHub Pages (sans build)
.github/workflows/release.yml   « Release plugins » : compile, signe, publie, met à jour index.json
.github/workflows/pages.yml     déploie site/ (avec index.json) sur GitHub Pages
```

Le code source d'AI Studio se trouve actuellement dans le dépôt du moteur, dans `plugins/orbit_ai_studio_plugin`.

## Fonctionnement d'une release

1. Une fois : `cargo xtask plugin-key gen` (dans le dépôt du moteur) écrit la clé privée hors de tout dépôt et affiche la clé publique. Mettez le contenu du fichier dans le secret `ORBIT_PLUGIN_SIGNING_KEY` de ce dépôt ; la clé publique est intégrée à l'éditeur (`OFFICIAL_PUBLIC_KEY`).
2. Lancez le workflow **Release plugins** avec le tag de l'éditeur en entrée (ex. `v0.4.0`). Il récupère OrbitEngine à ce tag, copie `plugins/*` dans le workspace du moteur, compile l'éditeur et les plugins avec la toolchain et le `Cargo.lock` du moteur (Windows et Linux), les signe, envoie les fichiers `.orbitplugin` dans une release GitHub et commit l'`index.json` mis à jour.
3. Le site est redéployé et les éditeurs voient la nouvelle version au prochain rafraîchissement du catalogue.

Détails : [docs/plugin-store.md](https://github.com/UZApocalyps/OrbitEngine/blob/master/docs/plugin-store.md).

## Contribuer un plugin

Ouvrez une pull request ajoutant `plugins/<crate>/` avec :

* un `Cargo.toml` qui utilise les dépendances du workspace et dépend de `orbit_editor_sdk` ;
* un `manifest.ron`.

Les mainteneurs relisent le code avant toute release : les builds officiels sont signés, donc le code fusionné s'exécute chez les utilisateurs.

## Héberger son propre catalogue

Tout dépôt contenant un `index.json` au format documenté et ses fichiers `.orbitplugin` (releases GitHub ou tout hébergeur HTTPS) convient. Générez une clé avec `cargo xtask plugin-key gen --out <fichier>`, signez avec `--sign <fichier>`, publiez la clé publique. Les utilisateurs ajoutent l'URL de votre dépôt dans **Outils > Extensions > Plugins… > Sources** (avec la clé : De confiance ; sans : Non signé, avec avertissement).

## Licence

TODO : licence pas encore choisie (voir `LICENSE-TODO.md`).
