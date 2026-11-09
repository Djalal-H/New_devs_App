Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_PersistQueryClientProvider = require("./PersistQueryClientProvider.cjs");
exports.PersistQueryClientProvider = require_PersistQueryClientProvider.PersistQueryClientProvider;
var _tanstack_query_persist_client_core = require("@tanstack/query-persist-client-core");
Object.keys(_tanstack_query_persist_client_core).forEach(function(k) {
	if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function() {
			return _tanstack_query_persist_client_core[k];
		}
	});
});
