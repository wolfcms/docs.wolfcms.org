.. _installation:

Installation
============

Getting Wolf CMS installed on your server or hosting package involves a number of steps. Fortunately, the steps are fairly simple and are applicable to most hosting providers. (Most of the steps below are illustrated in `this 4m45s video <http://screenr.com/c4f>`_, also available on `YouTube <http://www.youtube.com/watch?v=66BoegrqDxw>`_), which demonstrates how to install Wolf CMS (0.7.3) with mySQL as the database on localhost.)

Creating a database
-------------------

Wolf CMS depends on a database being available. Creating one yourself [#f1]_ or having one created for you depends on your exact environment or hosting provider and is beyond the scope of this document.

For our installation purposes, we will assume that you can or already have created a database for use by Wolf CMS.

mySQL
`````

If you are using mySQL, it is probably best to have the db prepared *before* proceeding with the rest of the installation instructions. You will need to know:

* The database name
* The database username
* The database user password

and, if your specific environment differs from what Wolf expects, you may additionally need to know:

* The database server name or IP address
* The database server port number

Make sure that your database is using a **Unicode** collation type (e.g. ``utf8_general_ci``).

SQLite 3
````````

If you are using SQLite, it is probably best to create the db *during* the Wolf install process. Wolf's installation screen will suggest a location and filename for your db *outside* the Wolf directory structure. You will need to create the folder/file that the Wolf install screen recommends, or alternatively, another one of your own choosing.

In any case, this needs to be an absolute path, with full write permissions for Wolf to be able to use it. Ensure this has been done before proceeding to the final "Install" step.

Uploading the Wolf CMS package
------------------------------

After having retrieved the Wolf CMS package from our `download pages <http://www.wolfcms.org/download.html>`_, you will need to copy it to your webserver. Unzip the package in the appropriate directory on your server.

This will usually be a ``www`` or ``public_html`` directory or a subdirectory of that. Wolf CMS is quite happy to work inside a subdirectory.

.htaccess
`````````

If you want to use clean URLs (e.g. no "?" in the URL), then you will have to:

1. Rename ``_.htaccess`` to ``.htaccess``
2. Update, if necessary, the ``RewriteBase`` parameter in the ``.htaccess``

.. note:: For installations in the root of your site (e.g. http://www.example.com/) the ``RewriteBase`` entry should be ``/``,
          for installations within a sub-directory (e.g. http://www.example.com/my-wolfcms/) this should be ``/my-wolfcms/``.

Use of magic_quotes_gpc
```````````````````````

It is **highly** recommended to switch off ``magic_quotes_gpc`` since this feature is deprecated starting PHP
5.3 and will removed starting PHP 5.4. If it is not already turned off by the server operator, you can try to
do this in the ``.htaccess`` file by adding a line ``php_flag magic_quotes_gpc off``.

Many servers are configured to not allow changing settings using ``.htaccess`` and the install will fail.

.. tip:: Your hosting provider may allow the use of a custom :file:`php.ini` to add this setting as ``magic_quotes_gpc off``. If using such a custom :file:`php.ini` file produces a blank screen, you should
         contact your hosting provider to inquire how to disable the magic quotes feature.

Running the install routine
---------------------------

After you have copied the files onto your webserver, you will need to run the installation routine.

1. Open your browser and go to the root of your Wolf CMS installation.
    * An automatic redirect should take you to the ``/wolf/install/`` section of your new site.
2. Answer all the questions after reviewing them carefully.

After finishing the installation, you will get a message that includes a link to the admin section of your new site. That page also shows you the administrator's username and **generated password**.

Post install steps
------------------

A number of post installation steps are required and advised for you to do. These will help secure your Wolf CMS installation.

* Delete the ``/install`` and ``/docs`` directories.
* Remove all of the write permissions for the :file:`config.php` file. [#f2]_
* Run the security check to determine any other steps you might need to take.

You can now login with the administrator's username and **generated password** which was displayed on the post installation confirmation page.

.. warning:: You should **always** change your administrator's password to something private and secure!

.. tip:: You may optionally also wish to change the location of your admin section to further enhance the security of your new Wolf CMS website.

.. rubric:: Footnotes

.. [#f1]

    If you are using mySQL for your db, phpMyAdmin is a good tool for this.
    
.. [#f2]

    Removing the write permissions from :file:`config.php` is a mandatory security measure & Wolf CMS will refuse to execute until you do this.
