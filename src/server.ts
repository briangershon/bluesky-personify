import app from './api';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
  console.log(`📝 API endpoint: http://localhost:${port}/`);
});
