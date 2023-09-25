export const GET = async ({ request, url }) => {
	try {
		return new Response(JSON.stringify({
            success: true
        }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
