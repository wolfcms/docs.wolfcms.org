.. _requirements:

Requirements
============

Web server
----------

To run Wolf CMS, you'll need a web server that supports PHP (such as Apache) to host Wolf CMS's files. If
you want to use clean URLs (no "?" in the URL), then you will also require support for some sort of URL
rewriting mechanism in your HTTP server.

While the system is tested on the Apache HTTP server, Wolf CMS is known to run on these HTTP servers as well:

* Cherokee
* Lighttpd
* Nginx
* Hiawatha

.. note:: If you're running Wolf CMS on a different HTTP server successfully, please let us know at `forum.wolfcms.org <http://forum.wolfcms.org/`_

PHP
---

* You need PHP 5.3.0 or newer, with ``session`` support and magic_quotes_gpc turned off.

* You need native PDO support.

Database
--------

Wolf CMS currently supports several databases.

* MySQL 5 or newer
* PostgreSQL 8.4.5 or newer
* SQLite 3

