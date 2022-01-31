import styled from '@emotion/styled/macro';

export const GridContainer = styled.div`
  text-align: center;
  margin: auto;
  width: 100%;
`;

export const Img = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  position: relative;

  &.one {
    width: 100%;
    padding-top: 100%;
  }

  &.two {
    width: 50%;
    padding-top: 50%;
  }

  &.three {
    width: 33.3333%;
    padding-top: 33.3333%;
  }

  .cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .cover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fds-white);
    font-size: 2.4rem;
  }
`;
