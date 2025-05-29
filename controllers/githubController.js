import fetchPRs from '../utils/fetchPRs.js';

const getPullRequests = async (req, res) => {
    const { username } = req.params;

    try {
        const result = await fetchPRs(username);
        res.json(result);
    } catch (error) {
        console.error("ERROR in getPullRequests:", error);
        res.status(error.status || 500).json({ error: error.message || 'Server error' });
    }
};

export { getPullRequests }