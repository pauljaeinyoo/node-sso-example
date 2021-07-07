var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
const WorkOS = require('@workos-inc/node').default;

const client = new WorkOS("sk_test_a2V5XzAxRjlZWEtBODFNS1RHSzQ2RDVKQ1FTVlNFLE5oRmhRYmdSbUNvZ1F1WWNTSUdlRWNRVTQ");
const domain = "foo-corp.com";
const redirectURI = "https://foo-corp.okta.com/app/foo-corp_segmentstagingworkostestapp_1/exk3q0mmjjJsoX3ym4x7/sso/saml";
const projectID = "client_01F9YXKA8F2TW2CRRWG9BTHG4Q";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page */
router.get('/login', (_req, res) => {
  const url = client.sso.getAuthorizationURL({
    domain,
    redirectURI,
    projectID,
  });
  res.redirect(url);
});

/* GET callback page */
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const profile = await client.sso.getProfile({
    code,
    projectID,
  });
  res.json(profile).send();
});

module.exports = router;
