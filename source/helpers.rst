.. _helpers:


Helpers
=========

Helpers are similar to plugins: they are separate pieces of code which extend Wolf CMS's functionality. However, helpers are never loaded in unless specifically called by an outside piece of code.

They are found in the ``<root>/wolf/helpers/`` directory.

Using Helpers
-------------

To call a single helper, use: ``<?php use_helper('Pagination'); ?>``

You can call more than one helper at a time by listing them as parameters:

.. code-block:: php

  <?php use_helper('Email', 'Pagination', 'Zip'); ?>

The functionality provided by the helper will only be available on the page(s) where it is specifically called by this code.

Helpers currently supplied with Wolf CMS
----------------------------------------

.. list-table:: Current Helpers
   :widths: 15 40
   :header-rows: 1

   * - Name
     - Description
   * - BigInteger
     - Arbitrary precision integer arithmetic library; adapted from phphseclib.
   * - Email
     - Simple Email library that permits email to be sent using Mail, Sendmail, or SMTP.
   * - I18n
     - Simple internationalisation library used by Wolf CMS core for translations.
   * - Hash
     - Keyed-hash message authentication codes; adapted from phphseclib.
   * - Kses
     - HTML/XHTML filter that only allows some elements and attributes.
   * - :ref:`pagination`
     - Simple Pagination helper based on the CodeIgniter pagination helper.
   * - :ref:`upload`
     - Simple upload library.
   * - :ref:`validate`
     - Functions to help validate data of different kinds; based on Kohana 2.x helper.
   * - Zip
     - Simple Zip library that allows creation and downloading of zip files.

.. _pagination:

Pagination
----------

The default pagination helper which comes with Wolf is a light revision of the the Code Igniter pagination helper. It allows multiple pages to be listed as a set of page links in the form:

    **Pages:** **1** 2 3 4

The notes that follow explain how to set up Pagination.php for use with the default "Articles" page in Wolf CMS, but can be modified for use with other pages as well. **Be aware** that for the *Set up*, the code varies depending on whether ``mod_rewrite`` is enabled or disabled.

.. _note:: These instructions assume ``mod_rewrite`` is **enabled**, with the **disabled** version given as a variation.

Usage
+++++

**1. Call objects to Paginate**

Open the **Articles** page for editing: this is the **only** page used for these instructions. This first thing to do at the top of the page, is call the "page objects" you wish to paginate:

.. code-block:: php

  <?php $last_articles = $this->children(array('limit'=>5, 'offset'=>($pagination->cur_page)*($pagination->per_page),  'order'=>'page.created_on DESC')); ?>
  
Here, note that ``limit`` should be the **same value** as the ``per_page`` value in the set up of step #3, below. The ``offset`` code is required by the helper to form the links properly, but takes its values from the pagination set up.

**2. Loop through the pages**

.. code-block:: php

  <?php foreach ($last_articles as $article): ?>
  
  <div class="entry">
    <h3><?php echo $article->link($article->title()); ?></h3>
    <?php // Whatever else you want to include: teaser? meta? etc. ?>
  </div><!-- end .entry -->
  
  <?php endforeach; ?>  
  
**3. Set up helper**

At this point, call the helper, and set the options (*if this code block is put at the top of the page, the offset will not work properly*):

.. code-block:: php

  <?php use_helper('Pagination');
  $pagination = new Pagination(array(
   'base_url' => '/articles?page=',
   'total_rows' => $this->childrenCount(),
   'per_page' => 5,
   'num_links' => 8,
   'cur_page' => (isset($_GET['page']) ? $_GET['page']: 1)
  )); ?>

Only three of those lines might require adjustment:

  * ``base_url`` - include the slug of the current page (here, "articles"), which is the parent of the pages you wish to paginate, followed by ``?page=``
  | **If mod_rewrite is disabled**, then add another "?" after the initial slash: ``/?articles?page=``
  * ``per_page`` - the number of sub-pages linked on each paginated page
  * ``num_links`` - when this number of page links is exceeded,  a "First" and "Last" link will be added to the left and right of the number list.

**4. Call pagination links**

.. code-block:: php
  <?php if ($pagination->total_rows > $pagination->per_page) echo '<p><br />Pages: '.$pagination->createLinks().'</p>'; ?>

You can vary the ``<p>`` and ``<br />`` markup to suit your layout. Now **save** the Articles page. Done!


.. _upload:

Upload
------

The Upload helper is a way for you to add simple file upload functionality to Wolf CMS.

.. caution:: This helper is still under development, and does not yet work.

.. _validate:

Validate
--------

Validate helper is for validating fields. In this example it is used to check for a valid email address:

.. code-block:: php

  <form action="<?php echo $this->url(); ?>" method="post">
  E-mail: <input type="text" name="email" />
  <input name="submit" type="submit" value="Submit" />
  </form>
   
  <?php
  use_helper('Validate');
  $email = isset($_POST['email']) ? htmlentities($_POST['email'], ENT_QUOTES, "UTF-8") : '';
  if(isset($_POST['submit'])):
     if(Validate::email($email)== true):
         echo '<h3>Valid e-mail</h3>';
       else:
         echo '<h3>Invalid e-mail!</h3>';
     endif;
  endif;
  ?>

It also has support for:

* email()
* email_domain()
* email_rfc()
* url()
* phone()
* date()
* datetime()
* alpha()
* alpha_numeric()
* alpha_dash()
* alpha_comma()
* slug()
* alpha_space()
* alphanum_space()
* digit()
* numeric()
* range()
* decimal()
* color()
* multiple()
* valid_utf8()
* compliant_utf8()

