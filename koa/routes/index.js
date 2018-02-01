const router = require('koa-router')();
module.exports = router;

/**
 * 
 * @param {Context} ctx 
 */
async function first(ctx) {
   return await ctx.render('f');
}

async function second(ctx){
    return await ctx.render('s');
}

router.get('/f', first);
router.get('/s',second);