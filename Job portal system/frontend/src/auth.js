const isAuthenticate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Send a request to the server to validate the token
        const response = await fetch('http://localhost:4000/auth/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error while verifying token:', error);
      return false;
    }
  };
  
  export default isAuthenticate;
  