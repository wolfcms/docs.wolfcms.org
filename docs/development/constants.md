Constants
=========

There are a number of system constants available to make plugin development simpler.

Paths
-----

| Constant     | Description                    | Example                    |
| ------------ | ------------------------------ | -------------------------- |
| APP_PATH     | Path of wolf core directory    | /var/www/html/wolf/app     |
| CMS_ROOT	   | Path of wolf install           | /var/www/html              |
| CORE_ROOT	   | Path of wolf app directory     | /var/www/html/wolf         |
| PLUGINS_ROOT | Path of wolf plugins directory | /var/www/html/wolf/plugins |
| THEMES_ROOT  | Path of Wolf themes directory. | CMS_ROOT/public/themes     |

URLs
----

| Constant        | Description                                             | Example                                   |
| --------------- | ------------------------------------------------------- | ----------------------------------------- |
| ADMIN_DIR       | Site's backend web address                              | `http://www.mywebsite.com/admin/`         |
| PLUGINS_URI	    | Web address of your plugin directory                    | `http://www.example.com/wolf/plugins/`    |
| THEMES_URI      | Web address of your themes directory                    | `http://www.mywebsite.com/public/themes/` |
| URI_PUBLIC      | Relative address of your site                           | / or /wolfcms/ when installed in subdir   |
| URL_PUBLIC      | Web address of your site                                | `ttp://www.mywebsite.com/`                |
| BASE_URL        | Web address of your site including mod_rewrite use      | `http://www.mywebsite.com/`               |
| BASE_URI        | Relative address of your site including mod_rewrite use | / or /wolfcms/ when installed in subdir   |
| URL_SUFFIX	    | The extension of generated URLs.                        | .html                                     |
| USE_MOD_REWRITE	| If mod_rewrite (nice URLs) is enabled                   | true or false                             |

Database
--------

| Constant     | Description                            | Example                                            |
| ------------ | -------------------------------------- | -------------------------------------------------- |
| DB_DSN     	 | The DSN (type/address of the database) | mysql:dbname=cms_database;host=localhost;port=3306 |
| TABLE_PREFIX | The prefix attached to all table names | wolfcms_                                           |
| __CMS_CONN__ | PDO Database Connection                | '$pdo = $__CMS_CONN__->prepare($sql);' Please note that it is preferred for you to use `Record::getConnection()` which also returns a PDO Database connection. |

Page Status
-----------

Wolf assigns one of four different “status” levels to pages; each status named below also has a corresponding numerical value. Note these two examples:

1. This returns the numerical value corresponding to the page status:
    ```
    <?php echo $this->status_id; ?>
    ```
2. The name can be used when testing for a particular status:
    ```
    <?php if ($this->status_id == Page::STATUS_PUBLISHED) { echo 'PUBLISHED'; } ?>
    ```

This is the equivalent of this code which produces the same result:

```
  <?php if ($this->status_id == 100) { echo 'PUBLISHED'; } ?>
```

### Draft

> Page::STATUS_DRAFT

The “draft” status is for use during the early stages of producing a page, before it is ready for display on the frontend of the website.

* It will **NOT** be listed by: `$this->children()`
* It will **NOT** be found by: `$this->find('its_uri')`
* It is **NOT** possible to access the page directly with its full url

### Preview

> Page::STATUS_PREVIEW

This status allows content editors to view a page “live” before publishing it; it can only be accessed by full URL (or the “View this page” link while editing in the backend) by a content editor who is logged in to Wolf.

* It will **NOT** be listed by `$this->children()`
* It will **NOT** be found by `$this->find('its_uri')`
* It is possible to access it directly with its full url **ONLY IF** logged in with the role of administrator, developer, or editor

### Published

> Page::STATUS_PUBLISHED

Once “published”, a page is viewable on the frontend by any visitor to the website.

* It will be listed by `$this->children()`
* It will be found by `$this->find('its_uri')`
* It is possible to access it directly with its full url

### Hidden

> Page::STATUS_HIDDEN

Use this status when you have written a page that you do not want to appear in your site's navigation (e.g., RSS, Sitemap, etc.).

* It will **NOT** be listed by `$this->children()`
* It will be found by `$this->find('its_uri')`
* It is possible to access it directly with its full url

!!! note
    A “hidden” page can be listed with `$this->children(array(), array(), true)`, because `children()` can include hidden pages if the 3rd param is set to **true**.
