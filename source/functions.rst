.._functions:


Functions
=========

For now just testing out shpinx.

Author
------

Wolf saves the id of the user who creates a page, and the name for that id can be displayed using author(). This is commonly given in the page's “meta”, for example: 

.. code-block:: bash

	<p class="meta">Posted by <?php echo $this->author(); ?></p>
	
See also the updater() function.