.. _faq:

Frequently Asked Questions
==========================

.. _faqinstallation:

Installation
++++++++++++

.. _faq1_1:

1.1 Is there an installation manual?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Yes. Please see the ``docs/`` directory included in the download for basic instructions on installation and upgrading. This site contains more complete information on :ref:`installation`.

.. _faq1_2:

1.2 Installation completed, but there is nothing in the database?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

* Make sure you have entered the correct database information during the :ref:`installation` process.
* Make sure your system complies with the Wolf CMS :ref:`requirements`.
* Delete the contents of :file:`config.php`, make sure there are no tables left in the database and try re-running the installation routine.

.. _faq1_3:

1.3 The front-end works but I cannot login to the admin section?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Assuming you have used the correct username and password, which was given to you at the end of the installation process, the problem might be with your PHP session.

* Go to the login form and enter an incorrect username/password. If there is no red error message, your PHP session probably doesn't store variables.
* To fix this: check that the path for the session file is correct in your :file:`php.ini` configuration file.
* Make sure the session storage type is set to file.

.. note:: You should consult with your hosting provider if applicable.

