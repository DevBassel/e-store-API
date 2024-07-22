"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiQueryArray = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function ApiQueryArray(queries) {
    return (0, common_1.applyDecorators)(...queries.map((query) => (0, swagger_1.ApiQuery)(query)));
}
exports.ApiQueryArray = ApiQueryArray;
//# sourceMappingURL=queryArray.decorator.js.map