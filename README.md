monolist-marketing
==================

The static marketing and landing page for the now-defunct music app Monolist.

---

### Getting up and running

1. Clone this repo
2. Run `npm install` from the root directory
3. Run `gulp dev` (may require installing Gulp globally `npm install gulp -g`)
4. Your browser will automatically be opened and directed to the browser-sync proxy address
5. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development)

Now that `gulp dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

### Deploying

1. Run `gulp deploy`

**Note:** This will attempt to read AWS credentials from `process.env.*`, which is read in from a `.env` file in the root directory. That should be of the format:

```
AWS_KEY='<YOUR_KEY>'
AWS_SECRET='<YOUR_SECRET>'
S3_BUCKET='<BUCKET_NAME>'
S3_REGION='<REGION_NAME>'
```
