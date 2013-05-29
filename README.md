LAL
===

Light Application List for YunoHost


Install
-------

*N.B.*: Replace paths and UNIX users with yours.

1. Clone the repo as a web document root
``` git clone https://github.com/YunoHost/lal /var/www/app.yunohost.org ```
2. Copy sample files and adapt it (.htpasswd generator: http://www.htaccesstools.com/htpasswd-generator/)
```
cp .htaccess.sample .htacess
cp .htpasswd.sample .htpasswd
cp list.json.sample list.json
vim .htacess .htpasswd list.json
```
3. Change permission of the directory
``` chown -R www-data: /var/www/app.yunohost.org ```

4. Configure & reload apache (basic vhost, htaccess included) or nginx (vhost = nginx-vhost.sample)
