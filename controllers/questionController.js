const createQuestion = async (req, res) => {
  res.send('create question')
}

const deleteQuestion = async (req, res) => {
  res.send('delete question')
}

const getAllQuestions = async (req, res) => {
  res.send('get all questions')
}

const updateQuestion = async (req, res) => {
  res.send('update question')
}

const showStats = async (req, res) => {
  res.send('show stats')
}

export {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
  showStats
}
