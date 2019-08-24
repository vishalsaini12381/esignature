var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function(req, res, next) {
  res.render('admin/login');
});


router.get('/admin/dashboard', function(req, res, next) {
   res.render('admin/dashboard');
});
router.get('/admin/branch-list', function(req, res, next) {
  res.render('admin/branch_list');
});
router.get('/admin/branch-detail', function(req, res, next) {
  res.render('admin/branch_detail',{query : req.query.id});
});
router.get('/admin/add-new-branch', function(req, res, next) {
  res.render('admin/add_new_branch');
});

router.get('/admin/staff-list', function(req, res, next) {
  res.render('admin/staff/staff_list');
});
router.get('/admin/staff-detail', function(req, res, next) {
   //res.send('id: ' + req.query.id);
  console.log(req.query.id)
  res.render('admin/staff/staff_detail',{query : req.query.id});
});
router.get('/admin/add-new-staff', function(req, res, next) {
  res.render('admin/staff/add_new_staff');
});


router.get('/admin/logout', function(req, res, next) {
  res.render('admin/logout');
});

/////////////////////////////////////STAFF///////////////////////////////
router.get('/staff', function(req, res, next) {
  res.render('staff/login');
});
router.get('/staff/login', function(req, res, next) {
  res.render('staff/login');
});
router.get('/staff/dashboard', function(req, res, next) {
  res.render('staff/dashboard');
});
router.get('/staff/upload-document', function(req, res, next) {
  res.render('staff/uploaddoc');
});
router.get('/staff/my-profile', function(req, res, next) {
  res.render('staff/my_profile');
});
router.get('/staff/upload-new-document', function(req, res, next) {
  res.render('staff/upload_new_document');
});
router.get('/staff/exixting-document', function(req, res, next) {
  res.render('staff/exixting_document');
});
router.get('/staff/document-detail', function(req, res, next) {
  res.render('staff/document_detail',{query : req.query.id});
});

router.get('/staff/logout', function(req, res, next) {
  res.render('staff/logout');
});
/////////////////////////////////////STAFF///////////////////////////////








router.get('/admin/new', function(req, res, next) {
  res.render('admin/new');
});

module.exports = router;
