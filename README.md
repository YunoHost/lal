LAL
===

Light Application List for YunoHost


Install
-------

**N.B.**: Replace paths and UNIX users with yours.

* Clone the repo as a web document root

```no-highlight
git clone https://github.com/YunoHost/lal /var/www/app.yunohost.org
```

* Copy sample files and adapt it (.htpasswd generator: http://www.htaccesstools.com/htpasswd-generator/)

```no-highlight
cp .htaccess.sample .htacess
cp .htpasswd.sample .htpasswd
cp list.json.sample list.json
vim .htacess .htpasswd list.json
```

* Change mail addresses as you need

```no-highlight
js/main.js: Line 82
validate.php: Line 73, 76, 77
```

* Change owner of the directory

```no-highlight
chown -R www-data: /var/www/app.yunohost.org
```

* Configure & reload apache (basic vhost, htaccess included) or nginx (vhost = nginx-vhost.sample)
