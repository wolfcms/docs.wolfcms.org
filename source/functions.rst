.. _functions:


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

children()
----------

*children()* returns an array of values relating to the child pages of the current page. [#f2]_ Normally, then, it is not used on its own, but to give some information about published subpages to a given page.

The array produced by children() requires a foreach loop to present usable information. The most simple listing of subpage titles, then, could look like this:

.. code-block:: php

	<h3>List of pages</h3>
	 
	<ul>
		<?php  foreach ($this->children() as $child) : ?>
		<li><?php echo $child->title(); ?></li>
		<?php endforeach; ?>
	</ul>

In situations when in return only a single result is desired, the foreach loop should be ditched in favor of limit ⇒ 1 argument (see Arguments below in this page), otherwise it will not work and a fatal error is returned instead. The example below returns the last published page from Articles as the parent page.

.. code-block:: php

	<?php 
	  $page_article = $this->find('/articles/');
	  $last_article = $page_article->children(array('limit'=>1, 'order'=>'page.created_on DESC')); 
	?>
		<h2 class="post_title"><?php echo $last_article->link(); ?></h2>
		<?php echo $last_article->content(); ?>
		<?php if ($last_article->hasContent('extended')) echo $last_article->link('Continue Reading&#8230;'); ?>

For further information on how to use *children()* in constructing menus, see how to Display a list of subpages. 

Conditions
++++++++++

Including hidden pages
``````````````````````

By default, children() only returns "published" pages. [#f3]_ In the following line of code, the final 'true' tells Wolf to include hidden pages as well:

.. code-block:: php

	$this->children(null,array(),true)


Additional arguments
````````````````````

Four more arguments can be given to *children()* to further define the subpages it returns: 

* where - sets a condition
* order - determines the sort order (by field name in page table [see note below], either ASC ascending, or DESC descending)
* offset - where in the list of subpages to begin the list
* limit - how many pages to return

A note on "order"
`````````````````

Any of the fields in the page table can be used to sort your "children" pages. In first example, below, you could have:

*'order' => 'title ASC'*

to arrange the order by the page Title in A-Z order, or

*'order' => 'slug DESC'*

to order the list by “slug” value in Z-A order. That should give you the idea! While any value in the “page” table could be used here, the main options would include:

* title
* slug
* breadcrumb
* created_on
* published_on
* updated_on
* created_by_id
* updated_by_id

The default is *position*, which is set automatically when the drag-drop page re-ordering is used.

	
	
.. [#f2]

	Consult the documentation on $this-> to find out what the “current” page is in different situations.
	
.. [#f3]

	Consult the documentation on creating a page for a full list of page-status definitions.

childrenCount()
---------------

The childrenCount() function returns a count of how many child pages belong to the current page. A simple echo $this->childrenCount(); will return the number of “published” pages to the current page.

childrenCount() can be useful, then, for determining when to include navigation, for example: 

.. code-block:: php

	<?php if ($this->childrenCount() > 0) {
			// if count is > 0, there are child pages, so do stuff
		} else {
			// no child pages, so do something else
		}
	?>

It takes the same parameters as the children() function; see the above for details. 

content()
---------

As its name suggests, the content() function returns the content of pages created in Wolf. More specifically, it returns the content of the page-part given as a parameter; if no parameter is given, then it defaults to the body page-part, circled in red in this graphic: 

.. image:: ../images/content_tabs.png

In order to display the body, put this code at the appropriate place in your layout:

.. code-block:: php

	<?php echo $this->content(); ?>

Other content parts (page-parts) can be created by clicking the green "+" icon above the upper-right corner of the page editing box. (The red "-" icon deletes the active part/tab, so be careful!)

.. image:: ../images/content_tab-buttons.png

If you need to display one of these "custom" parts, like the sidebar tab in the Home Page graphic above (circled in blue), just add it to the parameter: 

.. code-block:: php

	<?php echo $this->content('sidebar'); ?>

.. note:: Note: if you use ``<?php echo $this->content(); ?>`` in page content, it will create an infinite loop: so don’t do it! In other words, only use that code for the page body tab in a Layout, not in a Page.

"Inheriting" content
++++++++++++++++++++

In order for the “part” to be inherited by "child" pages (and "child-of-child" pages, etc.), use the true parameter: 

.. code-block:: php

	<?php $this->content('sidebar', true); ?>

.. note: If the current page has its own equivalent "sidebar" part, then that will prevent the “inheritance” from the parent page from taking place. 

Displaying the content of one page on a different page
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you want to call the content from a some page onto a different page, you must use the find() function in conjunction with content(). For example, to display the content of the default “About us” page on any other page, use this code:

.. code-block:: php

	<?php echo $this->find('about_us')->content(); ?>

date()
------

To display the date a page was created, use:

.. code-block:: php

	<?php echo $this->date(); ?>
	
If you want to change the format of the date, you can pass it as the first parameter of the method like this:

.. code-block:: php

	<?php echo $this->date('%A, %e %B %Y'); ?>
	
For more information about the date format, check the PHP manual for *strftime* http://php.net/strftime

.. note:: On Windows, and rarely in other settings, the use of %e may prevent any date appearing! In this case, use %d in its place. (See PHP Bugs for more information, the date howto for a work-around.) 

Values
++++++

The default date returned is the page’s creation date. The dates which can be displayed are:

* created — (default) which returns the date the page was initially stored in the database, no matter what "Status" it had;
* published — which returns the date the page was first saved with the “Status” set to "Published"; and
* updated — which returns the most recent date on which that page was altered (this can include re-ordering)

Example
+++++++

For example, if you want to display the last updated time of this page, use this: 

.. code-block:: php

	<?php echo $this->date('%a, %e %b %Y', 'updated'); ?>
	
How to translate every date in your layout
++++++++++++++++++++++++++++++++++++++++++

Set the locale to your language with the *setlocale* PHP function: 

.. code-block:: php

	<?php setlocale(LC_ALL, 'fr_CA.utf8'); ?>
	
For more information about this function, consult the PHP manual on *setlocale*  http://php.net/setlocale

description()
-------------

In editing a page, under the **Metadata** tab is the “Description” field which makes use of the ``description()`` function. The default Layout includes this line in the ``<head>…</head>`` section: 

.. code-block:: php

	  <meta name="description" content="<?php echo ($this->description() != '') ? $this->description() : 'Default description goes here'; ?>" />
	
This checks to see if there is any Metadata filled in for the page, and if there is, it is used. Otherwise, the default text is used. 

executionTime()
---------------

The ``executionTime()`` function returns the time in seconds it takes for the page to be rendered. It can be called this way:

.. code-block:: php

	<?php echo $this->executionTime(); ?>
	
When **DEBUG** is defined as **true** in ``config.php``, this information is also reported in the footer of the admin pages.

find()
------

The ``find()`` function can be used to find and retrieve Page objects. As such, it needs a value to search on, either a **slug** value or a variable. It returns a Page object which has further functions to retrieve page information (or an array of information, depending on which of the object's function you use). A simple example: 

.. code-block:: php

	<?php
		$pageobject = $this->find('/about-us');
		echo $pageobject->link();
	?>
	
You can also directly access the object's (in this case) ``link()`` function with a short hand notation. This prevents you from first having to assign the result of the ``find()`` function to a variable before accessing the object's functions. A simple example: 

.. code-block:: php

	<?php echo $this->find('/about-us')->link(); ?>
	
These two examples are functionally the same and produce the following HTML from anywhere in the site:

.. code-block:: html

	<a href="http://www.mywolfsite.com/about_us">About us</a>
	
For the **main** level of navigation, ``find()`` does not need forward-slashes. All of these will produce the same result:

* $this->find('/about-us')
* $this->find('/about-us/')
* $this->find('about-us')

``find()`` can be used in conjunction with most (probably all!) of Wolf's other functions, not just "link", as in the example above.

Examples
++++++++

Finding pages at Level 2
````````````````````````

When looking for child-of-child pages *(That is, pages at level “2”; see the ``level()`` documentation for explanations of levels)*, both terms need to be given:

* **hard** set: ``$this->find('fruit/apples');``
* using variables: ``$this->find($parent.'/'.$subpage);``

Note that the ``getUri()`` function gives all slugs for a page, including the slugs of all ancestor pages.

Using variables
```````````````

The value of the search term can be contained in a variable. For example, the conditional navigation in the “Wolf” default layout finds a variable, $parent, which is the current top-level navigation page. Using this value in conjunction with the "children" function produces a dynamic listing of child-pages, giving a simple menu:

.. code-block:: php

	<?php // simplified code:
    $topPage = $this->find($parent);
	?>
	 
	<ul>
	<?php foreach ($topPage->children() as $subPage) : ?>
		<li><?php echo $subPage->link(); ?></li>
	<?php endforeach; ?>
	</ul>
	

findById()
----------

The ``findById()`` function allows you to retrieve a set of page objects using a page's id as the search term. *(See the ``id()`` documentation on how to find the ID of any given page.)* This function works in the same way as the ``find()`` function; consult its entry for more discussion. 

**See also:** ``linkById()`` and ``urlById()`` gives information about using a variable for the ID.

Example
+++++++

You can use the id of page to construct a basic menu of child pages. This can be helpful in cases where the slugs or location of a parent page might change (“4” is the id of the “articles” page in a default installation of Wolf): 

.. code-block:: php

	<?php $children = $this->findById(4)->children(); ?>
	<ul>
	  <?php foreach ($children as $child) : ?>
	  <li><?php echo $child->link(); ?></li>
	  <?php endforeach; ?>
	</ul>
	

getUri()
--------

This function will return the **slug values** which point to a given page. 

Notes
+++++

For this code: ``<?php echo $this->getUri(); ?>``, note the different results:

    1. for URL: ``http://www.wolfsite.com/``
        * ``getUri()`` = [nothing]
    2. for URL: ``http://www.mysite.com/wolf/`` (when installing Wolf CMS in a subdirectory 'wolf')
        * ``getUri()`` = [nothing]``
    3. for URL: ``http://www.wolfsite.com/about_us``
        * ``getUri()`` = about_us
    4. for URL: ``http://www.wolfsite.com/about_us.html``
        * ``getUri()`` = about_us
    5. for URL: ``http://www.wolfsite.com/articles/2009/11/10/my_first_article``
        * ``getUri()`` = articles/my_first_article

Note in the last example that only the **slug** values are given, not the **yyyy/mm/dd** values generated by the **Archive plugin**. For this page behaviour, compare the related "constant", CURRENT_URI.

Examples
++++++++

Finding "top slug" for page tree
````````````````````````````````

It is often useful to find the slug of the top (level 1) page in a tree. This can be using for conditional navigation, or setting a unique background or banner for that area of the site, etc. The most simple code for this can use the ``getUri()`` function: 

.. code-block:: php

	// Returns the top parent slug:
	$topParent = reset(explode('/', $this->getUri()));
	
For the URI of ``fruit/apples/granny-smith`` with the code above, then ``echo $topParent;`` would return ``fruit``. 

Get list of "sibling" pages
```````````````````````````

If one wanted a list of “sibling” pages (at same level, with same parent), you wouldn't know in advance how many slugs were needed in the find-> statement, so here again ``getUri()`` should be used. The following code (to be used in a Layout) produces a simple sibling list of this kind: 

* Sibling1
* Sibling2
* Sibling3

.. code-block:: php

	<?php if ($this->level() > 0) : ?>
	<ul>
	<?php foreach ($this->find($this->parent->getUri())->children() as $sibling) : ?>
		<?php if ($this->slug() != $sibling->slug()) : ?>
	<li><?php echo $sibling->link(); ?></li>
		<?php endif; ?>
	<?php endforeach; ?>
	</ul>
	<?php endif; ?>
	
.. note:: Note that the code as given omits the current page. To include all sibling pages, including the current page, remove the “inner” if/endif statements (lines 4 and 6). 


