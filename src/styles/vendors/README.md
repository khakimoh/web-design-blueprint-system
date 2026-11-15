# styles/vendors/

Third-party CSS integrations, isolated from the rest of the system. Each vendor folder
configures its library **from tokens** and is loaded only by the entry that uses it.

| Folder | Library | Loaded by |
| --- | --- | --- |
| [bootstrap/](bootstrap/README.md) | Bootstrap 5.3 (Sass) | `main.scss` |

Never edit files in `node_modules`, never copy vendor source here. A different CSS framework
gets its own folder and entry file (see [technologies/README.md](../../../docs/technologies/README.md)).
