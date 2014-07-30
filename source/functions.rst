.._functions:


Functions
=========

The "functions" section houses pages that provide more detailed information about individual functions of Wolf CMS. These pages serve as an additional source of information on top of the PHPDoc references. These function pages may be out of date since they are manually maintained. 

author()
--------

Wolf saves the id of the user who creates a page, and the name for that id can be displayed using author(). This is commonly given in the page's “meta”, for example: 

.. code-block:: php

	<p class="meta">Posted by <?php echo $this->author(); ?></p>
	
See also the updater() function.

authorId()
----------

Wolf saves the unique id number of the user who creates a page, and that id number can be accessed using authorId(). This might be especially useful if two "authors" registered on the system have the same name. For example:

.. code-block:: php

	<?php if ($this->authorId() == '1') {
		// do things
		} else {
		// do something else
		}
	?>

would be a more reliable test than one using the author() function (which returns the name) if two users were both registered with same name.

There is also a updaterId() function available.

breadcrumb()
------------

When a page is created in Wolf, the “Breadcrumb” value is automatically completed with the same values as the page title itself. This is the page reference used automatically by the breadcrumbs function, but it can also be used on its own:

.. code-block:: php

	<?php echo $this->breadcrumb(); ?>

The "Breadcrumb" field is found under the "Metadata" tab next to the "Page Title" tab, and the value can be edited. [#f1]_ It may be, for example, that a very long page title could be abbreviated for use as a "breadcrumb". Once edited, and different from the Page Title, its value will remain unchanged even if the Page Title itself is changed.

.. [#f1] 
	
	It can be used, then, as a secondary “page title” field.

breadcrumbs()
-------------

 "breadcrumbs" can be created in Wolf by adding this code to a Layout:

.. code-block:: php
	
	<?php echo $this->breadcrumbs(); ?>

By default, it produces output of this kind:

*Home > Music > Baroque > Bach*

In order to change the value of the separator, include it as a parameter. If for example, you wish to use a forward slash:

.. code-block:: php

	<?php echo $this->breadcrumbs('/'); ?>

Any character may be used this way.

.. note::   if you wish to use a backslash, it must be given twice, since it is a PHP escape character: 

.. code-block:: php

	<?php echo $this->breadcrumbs('\\'); ?> 


