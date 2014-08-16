.. _development:

Development
===========

The Observer System
-------------------

Like many applications, Wolf CMS has an event/observer system. We call it the
observer system because Observers watch for events. Most usually, the observers
are used by plugins but they can be found in other parts of the Wolf CMS system.

Watching for events
```````````````````

In order to watch for an event and subsequently initiate some action, you first
tell the Observer system you want to observe an event, then you write a handler
function.

.. code-block:: php

  Observer::observe('page_edit_after_save', 'my_simple_observer');

  function my_simple_observer($page) {
      /* do what you want to do */
      var_dump($page);
  }

The first call to Observer::observe tells Wolf CMS that your plugin wants to
receive events of the type ``page_edit_after_save`` and that the function that
should handle these types of events is called ``my_simple_observer``.

Generating an event
```````````````````

Not only can you observe events that are generated, you can of course also
generate events yourself.

.. code-block:: php

  Observer::notify('my_plugin_event', $somevar);

As you can see, the code to generate an event is fairly simple. The first
argument, ``my_plugin_event``, is the event's name. The second argument is a
variable that is passed to the handling function. This variable can contain just
 about anything you want, from a simple string to an array of complex objects.

Using Observers to customize Page form
``````````````````````````````````````

Observer events in the Page editing form allow you to include custom inputs or
dialogs to save data that is not part of the page model. The following diagram
 gives you an indication of which event you should use and where it would be
 applied within the form.

.. note:: TODO - Add diagram

Overview of Observer events
```````````````````````````

The Wolf CMS Observer system has a number of events which will continue to
expand in the future. The following is a list of events with their parameters:

.. code-block:: php

  Observer::notify('admin_after_logout', $username);
  Observer::notify('admin_login_failed', $data['username']);
  Observer::notify('admin_login_success', $data['username']);

  Observer::notify('comment_after_add', $comment);
  Observer::notify('comment_after_approve', $comment);
  Observer::notify('comment_after_delete', $comment);
  Observer::notify('comment_after_edit', $comment);
  Observer::notify('comment_after_unapprove', $comment);

  Observer::notify('cron_run');

  Observer::notify('csrf_token_invalid', AuthUser::getUserName()); // Since 0.7.0
  Observer::notify('csrf_token_not_found', AuthUser::getUserName()); // Since 0.7.0

  Observer::notify('dispatch_route_found', $uri);

  Observer::notify('layout_after_add', $layout);
  Observer::notify('layout_after_delete', $layout);
  Observer::notify('layout_after_edit', $layout);

  Observer::notify('login_requested', $redirect); // Since 0.7.5
  Observer::notify('login_required', $redirect); // Since 0.7.5
  Observer::notify('logout_requested'); // Since 0.7.0

  Observer::notify('page_add_before_save', $page); // Added in Rev251 for 0.7.0
  Observer::notify('page_add_after_save', $page);
  Observer::notify('page_before_execute_layout', $layout); // Param. since 0.7.6
  Observer::notify('page_delete', $page);
  Observer::notify('page_edit_before_save', $page); // Added in Rev251 for 0.7.0
  Observer::notify('page_edit_after_save', $page);
  Observer::notify('page_found', $page);
  Observer::notify('page_not_found', $uri); // $uri parameter as of 0.8.0
  Observer::notify('page_requested', $uri);
  
  Observer::notify('part_add_before_save', $part); // Since 0.7.0
  Observer::notify('part_add_after_save', $part); // Since 0.7.0
  Observer::notify('part_edit_after_save', $part); // Since 0.7.0
  Observer::notify('part_edit_before_save', $part); // Since 0.7.0

  Observer::notify('plugin_after_disable', $plugin);
  Observer::notify('plugin_after_enable', $plugin);
  Observer::notify('plugin_after_uninstall', $plugin);

  Observer::notify('snippet_after_add', $snippet);
  Observer::notify('snippet_after_delete', $snippet);
  Observer::notify('snippet_after_edit', $snippet);

  Observer::notify('user_after_add', $user->name, $user->id); // id since 0.7.6
  Observer::notify('user_after_delete', $user->name, $user->id); // id since 0.7.6
  Observer::notify('user_after_edit', $user->name, $user->id); // id since 0.7.6
  Observer::notify('user_edit_view_after_details', $user); // Since 0.7.0

  Observer::notify('view_backend_list_plugin', $plugin_name, $plugin);
  Observer::notify('view_backend_layout_head', CURRENT_PATH); // 0.7.7-dev

  Observer::notify('view_page_edit_plugins', $page);
  Observer::notify('view_page_edit_tab_links', $page); // Added in for 0.7.4
  Observer::notify('view_page_edit_popup', $page);
  Observer::notify('view_page_edit_tabs', $page);
  Observer::notify('view_page_after_edit_tabs', $page);

