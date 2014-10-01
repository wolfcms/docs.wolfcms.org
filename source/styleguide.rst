.. _styleguide:

.. _top:

Styleguide
==========

Chapter title
-------------

Main Chapter title e.g. Functions, Constants etc. (presented as html h1 tag):

.. code-block:: txt

	Chapter title
	=============
	
This is what you see in the sidebar.

Document titles
---------------

Sub heading title (presented as html h2 tag):

.. code-block:: txt

	My sub heading title
	--------------------
	
Sub sub heading title (presented as html h3 tag):

.. code-block:: txt

	My sub sub heading title
	++++++++++++++++++++++++
	
Sub sub sub heading title (presented as html h4 tag):

.. code-block:: txt

	My sub sub sub heading title
	````````````````````````````
	
On Windows **AltGr + 7**

Notes
-----

For Notes (blue block) use:

.. code-block:: txt

	.. note:: Your note goes here!
	
Result:
+++++++

.. note:: This is note!

Warning
-------

For Warning message (orange block) use:

.. code-block:: txt

	.. warning:: Your note goes here!
	
Result:
+++++++

.. warning:: This is warning!

Tip
---

For Tips (green block) use:

.. code-block:: txt

	.. tip:: Your note goes here!
	
Result:
+++++++

.. tip:: This is tip!

	
Code blocks
-----------

For code blocks use:

.. code-block:: txt

	.. code-block:: php
	
		Paste or write your code
	
Inline markup
-------------


* one asterisk: ``*text*`` for emphasis (italics),
* two asterisks: ``**text**`` for strong emphasis (boldface), and
* backquotes: ````text```` for code samples.

Lists
-----

List markup is natural: just place an asterisk at the start of a paragraph and indent properly. The same goes for numbered lists; they can also be autonumbered using a # sign:

.. code-block:: txt

	* This is a bulleted list.
	* It has two items, the second
	  item uses two lines.

	1. This is a numbered list.
	2. It has two items too.

	#. This is a numbered list.
	#. It has two items too.
	
Nested lists
++++++++++++

Nested lists are possible, but be aware that they must be separated from the parent list items by blank lines:

.. code-block:: txt

	* this is
	* a list

	  * with a nested list
	  * and some subitems

	* and here the parent list continues
	
Hyperlinks
----------

Use ```Link text <http://example.com/>`_`` for inline web links. If the link text should be the web address, you don’t need special markup at all, the parser finds links and mail addresses in ordinary text.

You can also separate the link and the target definition, like this:

.. code-block:: txt

	This is a paragraph that contains `a link`_.

	.. _a link: http://example.com/
	
Crossreferences
+++++++++++++++

To cross reference certain pages or blocks within pages use ``.. _this-is-link:`` and then ``:ref:`this-is-link``` (same name is mandatory) to link to it.

Example:
++++++++

Take me to the :ref:`top`.
	
Images
------

You can insert image like this:

.. code-block:: txt

	.. image:: ../images/wolf_logo_128.png
   :alt: Wolf CMS logo
   
Before you do this, you need to prepare image (crop, resize, mark...) and put it in the ``images`` folder.

Result:
+++++++

.. image:: ../images/wolf_logo_128.png
   :alt: Wolf CMS logo


