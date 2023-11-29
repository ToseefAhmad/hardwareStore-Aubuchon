## Notes
Added a `'sha256-+hSsSV2IXXRsl5bMQeEDYHtphbqnY8bJDu6xoakSuXA='` SCP rule to allow Wunderkind scripts to properly load
* Because they run "onLoad" call for the JS `bouncex.initializeTag()`
```
Example:
<script src="//assets.bounceexchange.com/assets/smart-tag/versioned/runtime_b4ad65fa381da0648767eee58152de5e.br.js" async="async" onload="bouncex.initializeTag()"></script>
```
SHA256 was generated like so
```shell
echo -n 'bouncex.initializeTag()' | openssl sha256 -binary | openssl base64
```
