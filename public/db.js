let db;
let dbVersion = 3;
const storeName = 'BudgetStore';

const request = indexedDB.open( 'BudgetDB', dbVersion );

request.onerror = function ( e ) {
	console.log( `An error occured: ${e.target.errorCode}` );
};

request.onupgradeneeded = function ( e ) {
	console.log( 'Upgrading indexedDB' );

	const { oldVersion } = e;
	const newVersion = e.newVersion || db.version;

	console.log( `indexedDB updated from V${oldVersion} to V${newVersion}` );

	db = e.target.result;

	if( db.objectStoreNames.length === 0 ) {
		db.createObjectStore( storeName, { autoIncrement: true } );
	}
};

request.onsuccess = function ( e ) {
	console.log( 'Successfully opened indexedDB' );

	db = e.target.result;

	if( navigator.onLine ) {
		console.log( 'Backend online' );

		checkDatabase();
	}
};