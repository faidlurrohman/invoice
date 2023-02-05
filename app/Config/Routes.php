<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
// $routes->get('/', 'Home::index');

// job
$routes->get('job', 'Job::index');
$routes->post('job/add', 'Job::add');
$routes->post('job/edit', 'Job::edit');
$routes->post('job/delete', 'Job::remove');

// job type
$routes->get('jobtype', 'JobType::index');
$routes->post('jobtype/add', 'JobType::add');
$routes->post('jobtype/edit', 'JobType::edit');
$routes->post('jobtype/delete', 'JobType::remove');

// customer
$routes->get('customer', 'Customer::index');
$routes->post('customer/add', 'Customer::add');
$routes->post('customer/edit', 'Customer::edit');
$routes->post('customer/delete', 'Customer::remove');

// customer type
$routes->get('customer_type', 'CustomerType::index');
$routes->post('customer_type/add', 'CustomerType::add');
$routes->post('customer_type/edit', 'CustomerType::edit');
$routes->post('customer_type/delete', 'CustomerType::remove');

// customer code
$routes->get('customer_code', 'CustomerCode::index');
$routes->post('customer_code/add', 'CustomerCode::add');
$routes->post('customer_code/edit', 'CustomerCode::edit');
$routes->post('customer_code/delete', 'CustomerCode::remove');

// bank
$routes->get('bank', 'Bank::index');
$routes->post('bank/add', 'Bank::add');
$routes->post('bank/edit', 'Bank::edit');
$routes->post('bank/delete', 'Bank::remove');

// invoice
$routes->get('invoice', 'Invoice::index');
$routes->post('invoice/add', 'Invoice::add');
$routes->post('invoice/edit', 'Invoice::edit');
$routes->post('invoice/delete', 'Invoice::remove');

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
