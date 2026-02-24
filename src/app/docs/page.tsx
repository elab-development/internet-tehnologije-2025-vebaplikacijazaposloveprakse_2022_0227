import SwaggerUI from 'swagger-ui-react';


const page = () => {
  return (
    <div>page
        <h2>API Doc</h2>
        <SwaggerUI  url="swagger.json" />
        
    </div>
  );
};

export default page;