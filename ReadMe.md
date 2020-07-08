## ReadMe
Opens up Google Chrome for (shell) scripting, use with discretion. Enables a
user or system script with access to a FIFO to request tab and page info.

### Intro
Installs a popup to display metadata (and actions) for the displayed page.

A background process listens at one FIFO and responds on another using a
'stdio'-type message service.

### Install
- Add PWD as "unpacked" extension in "developer mode" <chrome://extensions>
- Copy messaging hosts to `~/.config/google-chrome/NativeMessagingHosts/<service-name>.json`.

## Dsgn
- Request with single line JSON at $TMP/htdocs-chrome.fifo
- Read responses as single line JSON at $TMP/htdocs-chrome-out.fifo

TODO:

Page
  - get-title
  - get-selection

Background
  - get-url - return bookmark and tab info for URL
  - get-urls - list open URLs only
  - get-pages - list titles and locations and link data for open tabs, see
    get-page for details.
  - get-page - list noteworthy resource details for url (if opened)
  - get-bookmark - retrieve bookmarks info
  - get-bookmarks - list bookmarks
  - set-clipboard
  - get-clipboard

## Status quo & objectives
- TamperMonkey/MeddleMonkey extends content-scripts (with javascript) for all or some URLs.
- Shellac can be setup to do almost anything (using shell scripts) using URLs as well.

Neither has an obvious and quick access for a shell script, and I do not want to
click somewhere on the browser everytime I need some data in a script. What I
want is to send a request and get a response on a stdio (in a shell). And
probably to trigger certain messages to a shell script or command as well. With
that done, it might as well be nice to popup with a representation of the
metadata and actions for the page. And then to make all those parts user-
configurable to some extend. There is some overlap with the two existing
extensions.
