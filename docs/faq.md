Frequently Asked Questions
==========================

Installation
------------

### 1.1 Is there an installation manual?

Yes. Please see the `docs/` directory included in the download for basic instructions on installation and upgrading. This site contains more complete information on [installation](getting-started/installation.md).

### 1.2 Installation completed, but there is nothing in the database?

* Make sure you have entered the correct database information during the [installation](getting-started/installation.md) process.
* Make sure your system complies with the Wolf CMS [requirements](getting-started/requirements.md).
* Delete the contents of `config.php`, make sure there are no tables left in the database and try re-running the installation routine.

### 1.3 The front-end works but I cannot login to the admin section?

Assuming you have used the correct username and password, which was given to you at the end of the installation process, the problem might be with your PHP session.

* Go to the login form and enter an incorrect username/password. If there is no red error message, your PHP session probably doesn't store variables.
* To fix this: check that the path for the session file is correct in your `php.ini` configuration file.
* Make sure the session storage type is set to file.

!!! note
    You should consult with your hosting provider if applicable.
