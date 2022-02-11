import styled from '@emotion/styled';

export const StyledEmotion = styled.div`
  background-color: var(--grayColor1);
  padding: 1.6rem;
  padding-top: 6.2rem;
  border-radius: var(--borderRadius3);
  border: 1px solid var(--borderColor);
  position: relative;
`;

export const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  height: 3rem;
  width: 3rem;
  background-color: var(--textColorGray);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--textColorWhite);
  }
`;

export const Emotions = styled.div`
  --col: 2;
  --gap: 2rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap);
  margin-right: calc(-1 * var(--gap));

  .emotion {
    width: calc(100% / var(--col) - var(--gap));
    display: flex;
    align-items: center;
    cursor: pointer;
    column-gap: 1rem;
    padding: 1rem 1.5rem;
    border-radius: var(--borderRadius);
    transition: all 0.3s;

    &.active {
      background-color: var(--mainColor);

      span {
        color: var(--textColorWhite);
      }

      .emoji {
        background-color: transparent;
      }
    }

    .emoji {
      background-color: var(--grayColor);
      border-radius: 50%;
      transition: all 0.3s;

      img {
        width: 2.4rem;
        height: 2.4rem;
      }
    }

    span {
      font-size: 1.6rem;
      color: var(--textColorGray);
    }
  }
`;
