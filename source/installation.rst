.. _installation:

Installation
============

Getting Wolf CMS installed on your server or hosting package involves a number of steps. Fortunately, the steps are fairly simple and are applicable to most hosting providers. (Most of the steps below are illustrated in `this 4m45s video <http://screenr.com/c4f>`_, also available on `YouTube <http://www.youtube.com/watch?v=66BoegrqDxw>`_), which demonstrates how to install Wolf CMS (0.7.3) with mySQL as the database on localhost.)

===== Create the database =====

Wolf CMS depends on a database being available. Creating one yourself [#f1]_ or having one created for you depends on your exact environment or hosting provider and is beyond the scope of this document.

For our installation purposes, we will assume that you can or already have created a database for use by Wolf CMS.

==== mySQL ====

If you are using mySQL, it is probably best to have the db prepared //before// proceeding with the rest of the installation instructions. You will need to know:

  * The database name
  * The database username
  * The database user password

and, if your specific environment differs from what Wolf expects, you may additionally need to know:

  * The database server name or IP address
  * The database server port number

Make sure that your database is using a **Unicode** collation type (e.g. ''utf8_general_ci'').

==== SQLite 3 ====

If you are using SQLite, it is probably best to create the db //during// the Wolf install process. Wolf's installation screen will suggest a location and filename for your db //outside// the Wolf directory structure. You will need to create the folder/file that the Wolf install screen recommends, or alternatively, another one of your own choosing.

In any case, this needs to be an absolute path, with full write permissions for Wolf to be able to use it. Ensure this has been done before proceeding to the final "Install" step.

===== Uploading the Wolf CMS package =====

After having retrieved the Wolf CMS package from our [[http://www.wolfcms.org/download.html | download pages]], you will need to copy it to your webserver. Unzip the package in the appropriate directory on your server.

This will usually be a "www" or "public_html" directory or a subdirectory of that. Wolf CMS is quite happy to work inside a subdirectory.

==== .htaccess ====

If you wish to use 'clean' - without '?' - URLs:

  - rename '_.htaccess' to '.htaccess'
  - update, if necessary, the RewriteBase parameter in .htaccess - '/' for root install or '/MY-SUB-DIRECTORY/'  otherwise

=== magic_quotes_gpc in .htaccess ===

It is recommended to switch off 'magic_quotes_gpc' and this is done in the .htaccess file with 'php_flag magic_quotes_gpc off'. However, some servers are configured to not allow this and the install will fail. You will therefore need to comment this out of .htaccess by starting the line with '#'.

Your host may allow use of php.ini to do this by setting 'magic_quotes_gpc off'. If using php.ini produces a blank screen, you may need to provide additional instructions in this file. See [[http://www.wolfcms.org/forum/post3359.html#p3359 | this forum discussion ]] for details.

===== Running the installation routine =====

After you have copied the files onto your webserver, you will need to run the installation routine.

  * Open your browser and go to the <wolf path>/ page
    * This should redirect to <wolf path>/wolf/install/
  * Answer all the questions after reviewing them carefully.

Your <wolf path> will likely be something like <nowiki>http://www.mysite.com/</nowiki> if you placed the Wolf CMS files in the root, or <nowiki>http://www.mysite.com/wolfcms/</nowiki> if you placed Wolf CMS in a subdirectory.

After finishing the installation, you will get a message that includes a link to your <wolf path>/admin/ section. This page also shows you the administrator's username and **generated password**.

===== Post installation steps =====

A number of post installation steps are required and advised for you to do. These will help secure your Wolf CMS installation.

  - Delete the <wolf path>/install and /docs directories from your webserver.
  - Remove all of the write permissions for the config.php file.((This is a security measure and Wolf CMS will refuse to execute until you do this.))
  - Run the Security check to determine any other steps you might need to take.
  - Login with the administrator's username and **generated password**.((This was displayed on the installation's result page.))
  - If you are using **SQLite**, be sure to enable the "SQLite" plugin in the Administration > Plugins page, otherwise the "Archive" pages will give errors.

<note warning>You should **always** change your administrator's password to something private and secure!</note>

**Optionally**, you may also wish to [[renaming_admin_folder|change the name of the admin folder]] to further enhance the security of your Wolf site.

.. rubric:: Footnotes

.. [#f1]

    If you are using mySQL for your db, phpMyAdmin is a good tool for this.
