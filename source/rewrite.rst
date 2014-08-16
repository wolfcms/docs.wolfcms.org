.. _rewrite:

Rewrite rules for various HTTP servers
======================================

Apache HTTP server
------------------

  - Edit the :file:`_.htaccess` file located in the Wolf CMS root directory.
  - Find the line starting with ``RewriteBase /wolfcms/`.
  - Save the **_.htaccess** file.
  - Rename the **_.htaccess** file into **.htaccess** (i.e. remove the underscore).

.. note:: If Wolf CMS lives in the root of your site like ``www.example.com``,
delete the ``wolfcms/`` part so the line equals: ``RewriteBase /``. If Wolf CMS
lives in a subdirectory of your site, like ``www.mypage.com/mywolf``, change the
``/wolfcms/`` part so the line equals: ``RewriteBase /mywolf/``.

Lighttpd server
---------------

The paths used in the rewrite code below assume that your Wolf CMS installation
lives at the root of the site, i.e. ``http://www.example.com``.

Since Lighttpd does not have an equivalent of Apache's RewriteBase command, you
will have to manually alter the paths below to conform to your Wolf CMS root.

.. code-block:

    #
    # Wolf CMS mod_rewrite rules for lighttpd
    #
    # If your Wolf CMS install lives in a sub-directory like: http://www.example.com/mywolf/
    # you should add the subdirectory between ^ and / in the rules below and in the replacement
    # value, for example: "^/mywolf/admin(.*)$" => "/mywolf/admin/index.php?$1",
    #
    url.rewrite-once = (

        "^/install/index.html$" => "/install/index.php?rewrite=1",
        "^/install/index.php$" => "/install/index.php?rewrite=1",
        "^/install/$" => "/install/index.php?rewrite=1",
        "^/install/(.*)$" => "/install/$1",

        "^/admin/(images|javascripts|stylesheets|themes)/(.*)" => "/admin/$1/$2",
        "^/admin/index.php\?(.*)$" => "/admin/index.php?$1",
        "^/admin(.*)$" => "/admin/index.php?$1",

        "^/favicon\.ico$" => "$0",
        "^/(public|wolf)/(.*)$" => "/$1/$2",

        "^(?:(?!/admin/))/([^?]*)(\?(.*))$" => "/index.php?WOLFPAGE=$1&$2",
        "^/(.*)$" => "/index.php?WOLFPAGE=$1"

    )


If you are using Wolf CMS 0.7.x, the location of some of the pages has changed.
You will need to use the following instead.  Since this uses ''url.rewrite-if-not-file'',
you will need at least version 1.4.24 of lighttpd.

.. code-block:

    url.rewrite-once = (

        "^/wolf/install/index.html$" => "/wolf/install/index.php?rewrite=1",
        "^/wolf/install/index.php$" => "/wolf/install/index.php?rewrite=1",
        "^/wolf/install/$" => "/wolf/install/index.php?rewrite=1",
        "^/wolf/install/(.*)$" => "/wolf/install/$1",
    )

    url.rewrite-if-not-file = (
        "^/([^\?]+)(\?(.*)$)?" => "/index.php?WOLFPAGE=$1&$3"
    )


Hiawatha server
---------------

The paths used in the rewrite code below assume that your Wolf CMS installation
lives in a "site" directory below the root of the system, i.e. ``http://www.example.com/site``

Since Hiawatha does not have an equivalent of Apache's RewriteBase command, you
will have to manually alter the paths below to conform to your Wolf CMS root.

You will need an UrlToolkit similar to this where ``site`` is the folder in the
web root where Wolf CMS is unpacked.

.. code-block:

    UrlToolkit {
        ToolkitID = wolfcms
        Match ^/site/install/index.html$ Rewrite /site/install/index.php?rewrite=1
        Match ^/site/install/index.php$ Rewrite /site/install/index.php?rewrite=1
        Match ^/site/install/$ Rewrite /site/install/index.php?rewrite=1
        RequestURI exists Return
        Match ^/site/admin(.*)$ Rewrite /site/admin/index.php?$1
        Match ^/site(.*)$ Rewrite /site/index.php?WOLFPAGE=$1
    }

Remember to enable this toolkit in your Virtual Host.

The 3 regex above RequestURI are optional since they are only used for clean url
validation during installation. They must be above RequestURI and can be commented
out after installation or left out entirely.

You must have PreventSQLi disabled (is also the default I think).

IIS
---

If you tried to install Wolf on an IIS, you'll notice it works **unless** you
activate the clean urls. Clean urls don't work "out of the box", because IIS
doesn't support the .htaccess files that are Wolf's default.

Instead, you need to create a file named :file:`web.config` and save it to the
root of the website. In this file you need to add the rewrite rules. Here's what
needs to be in this :file:`web.config` file.

.. note: For WolfCMS 0.7+

.. code-block:xml

    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
      <system.webServer>
        <rewrite>
          <rules>
            <rule name="Imported Rule" stopProcessing="true">
              <match url="^(.*)$" ignoreCase="false" />
              <conditions>
                <add input="{REQUEST_FILENAME}" matchType="IsFile" ignoreCase="false" negate="true" />
                <add input="{REQUEST_FILENAME}" matchType="IsDirectory" ignoreCase="false" negate="true" />
              </conditions>
              <action type="Rewrite" url="index.php?WOLFPAGE={R:1}" appendQueryString="true" />
            </rule>
          </rules>
        </rewrite>
        <httpErrors errorMode="DetailedLocalOnly" />
      </system.webServer>
    </configuration>

.. important: At one point, I was getting an error 500 from the server and I thought the problem came from the :file:`web.config` file. It turned out that I had opened a php tag as ``<?`` instead of ``<?php``. So if you encounter the same problem, verify your php tags!

Nginx server directives
-----------------------

Put the following code in your server block:

.. code-block

    try_files $uri $uri/ /index.php?WOLFPAGE=$uri&$args;

You may also have to set the URL suffix to be blank ``define('URL_SUFFIX', '');`` in :file:`config.php`

.. note: the code above assumes that your Wolf CMS installation lives at the folder defined by the root directive. For more information about Nginx rewriting, visit http://wiki.nginx.org/NginxHttpCoreModule#try_files.

Zeus server
-----------

.. code-block

    map path into SCRATCH:path from %{URL}
    look for file at %{SCRATCH:path}
    if exists then goto END
    look for dir at %{SCRATCH:path}
    if exists then goto END

    match URL into $ with ^/(.*)$
    if matched
        look for file at $1
        if not exists
            set URL=/index.php?WOLFPAGE=$1
            goto END
        endif
    endif
