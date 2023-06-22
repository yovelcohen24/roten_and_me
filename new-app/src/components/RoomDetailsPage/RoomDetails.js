import React from 'react';


  const RoomDetails = ({ room }) => {
    const [imageDimensions, setImageDimensions] = React.useState([]);
  
    React.useEffect(() => {
      const loadImageDimensions = async () => {
        const dimensions = await Promise.all(
          room.images.map((image) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = `${process.env.PUBLIC_URL}/${image}`;
              img.onload = () => {
                const { width, height } = calculateResizedDimensions(
                  img.naturalWidth,
                  img.naturalHeight,
                  500,
                  500
                );
                resolve({ width, height });
              };
            });
          })
        );
        setImageDimensions(dimensions);
      };
  
      loadImageDimensions();
    }, [room.images]);
  
    const calculateResizedDimensions = (originalWidth, originalHeight, maxWidth, maxHeight) => {
      const aspectRatio = originalWidth / originalHeight;
  
      let width = originalWidth;
      let height = originalHeight;
  
      if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }
  
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
  
      return { width, height };
    };
  
    return (
      <div>
        <h2>{room.name}</h2>
        <p>{room.description}</p>
        <p>Type: {room.type}</p>
        <p>Price: {room.costPerDay}</p>
        {/* Render images */}
        <table>
          <tbody>
            <tr>
              {room.images.map((image, index) => {
                const { width, height } = imageDimensions[index] || {};
  
                return (
                  <td key={index} style={{ width: '500px', height: '500px' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${image}`}
                      alt={`Room ${room.name}, pic[${index}]`}
                      style={{ height, width, objectFit: 'cover' }}
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RoomDetails;
  