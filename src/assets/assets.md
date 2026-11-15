# src/assets/

Conventions for static files. Since Angular CLI 18, new projects serve static files from the
**`public/`** folder at the project root; place these categories under `public/` with the same
sub-folder names (or configure `assets` in `angular.json` if the project prefers `src/assets/`).

| Folder | Contents |
| --- | --- |
| [images/](images/images.md) | Raster/vector images used by the UI |
| [icons/](icons/icons.md) | SVG icons or sprite (one icon set per project) |
| [fonts/](fonts/fonts.md) | Self-hosted web fonts |
| [documents/](documents/documents.md) | Downloadable files |
| [static-data/](static-data/static-data.md) | Static JSON used at runtime |

Reference assets with relative URLs so the app works under any base href.
