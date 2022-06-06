/**
 * @param
*/
export default function createCORS(options = {}) {
  return async function CORS(ctx, next) {
    const origin = ctx.host;
  }
}