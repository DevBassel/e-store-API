"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
async function paginate(Q, page = 1, limit = 10) {
    const [data, total] = await Q.skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
    return {
        data,
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
    };
}
exports.paginate = paginate;
//# sourceMappingURL=paginate.js.map