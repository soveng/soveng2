import React from 'react';
function Video({
  title,
  width = 500,
  height = 'auto',
  src,
  ...rest
}: {
  title: string;
  width: number;
  height: number | 'auto';
  src: string;
  [key: string]: unknown;
}) {
  return (
    <video className="overflow-hidden rounded-lg" width={width} height={height} controls {...rest}>
      <source src={src.match(/^http/) ? src : `/videos/${src}`} type="video/mp4" />
      <track kind="captions" src="" label="English" />
      {title}
    </video>
  );
}

export default Video;
