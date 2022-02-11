import { Stack } from '@mui/material';
import React, { Component } from 'react';
import { GridContainer, Img } from './Styles';

class Images extends Component {
  static defaultProps = {
    images: [],
    hideOverlay: false,
    renderOverlay: () => 'Preview Image',
    overlayBackgroundColor: '#222222',
    onClickEach: null,
    countFrom: 5,
  };

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      countFrom: props.countFrom > 0 && props.countFrom < 5 ? props.countFrom : 5,
      conditionalRender: false,
    };

    this.openModal = this.openModal.bind(this);
    this.onClose = this.onClose.bind(this);

    if (props.countFrom <= 0 || props.countFrom > 5) {
      console.warn('countFrom is limited to 5!');
    }
  }

  openModal(index) {
    const { onClickEach, images } = this.props;

    if (onClickEach) {
      return onClickEach({ src: images[index], index });
    }

    this.setState({ modal: true, url: images[index], index });
  }

  onClose() {
    this.setState({ modal: false });
  }

  renderOne() {
    const { images } = this.props;
    const { countFrom } = this.state;
    const overlay = images.length > countFrom && countFrom === 1 ? this.renderCountOverlay(true) : this.renderOverlay();

    return (
      <Stack direction="row" gap="0.8rem" marginBottom="0.8rem">
        <Img className="one" onClick={this.openModal.bind(this, 0)} style={{ backgroundImage: `url(${images[0]})` }}>
          {overlay}
        </Img>
      </Stack>
    );
  }

  renderTwo() {
    const { images } = this.props;
    const { countFrom } = this.state;
    const overlay =
      images.length > countFrom && [2, 3].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay();
    const conditionalRender = [3, 4].includes(images.length) || (images.length > +countFrom && [3, 4].includes(+countFrom));

    return (
      <Stack direction="row" gap="0.8rem" marginBottom="0.8rem">
        <Img
          className="two"
          onClick={this.openModal.bind(this, conditionalRender ? 1 : 0)}
          style={{
            backgroundImage: `url(${conditionalRender ? images[1] : images[0]})`,
          }}
        >
          {this.renderOverlay()}
        </Img>
        <Img
          className=" two "
          onClick={this.openModal.bind(this, conditionalRender ? 2 : 1)}
          style={{
            backgroundImage: `url(${conditionalRender ? images[2] : images[1]})`,
          }}
        >
          {overlay}
        </Img>
      </Stack>
    );
  }

  renderThree(more) {
    const { images } = this.props;
    const { countFrom } = this.state;
    const conditionalRender = images.length === 4 || (images.length > +countFrom && +countFrom === 4);
    const overlay =
      !countFrom || countFrom > 5 || (images.length > countFrom && [4, 5].includes(+countFrom))
        ? this.renderCountOverlay(true)
        : this.renderOverlay(conditionalRender ? 3 : 4);

    return (
      <Stack direction="row" gap="0.8rem" marginBottom="0.8rem">
        <Img
          xs={6}
          md={4}
          className=" three "
          onClick={this.openModal.bind(this, conditionalRender ? 1 : 2)}
          style={{
            backgroundImage: `url(${conditionalRender ? images[1] : images[2]})`,
          }}
        >
          {this.renderOverlay(conditionalRender ? 1 : 2)}
        </Img>
        <Img
          className=" three "
          onClick={this.openModal.bind(this, conditionalRender ? 2 : 3)}
          style={{
            backgroundImage: `url(${conditionalRender ? images[2] : images[3]})`,
          }}
        >
          {this.renderOverlay(conditionalRender ? 2 : 3)}
        </Img>
        <Img
          className=" three "
          onClick={this.openModal.bind(this, conditionalRender ? 3 : 4)}
          style={{
            backgroundImage: `url(${conditionalRender ? images[3] : images[4]})`,
          }}
        >
          {overlay}
        </Img>
      </Stack>
    );
  }

  renderOverlay(id) {
    const { hideOverlay, renderOverlay, overlayBackgroundColor } = this.props;

    if (hideOverlay) {
      return false;
    }

    return [
      <div key={`cover-${id}`} className="cover slide" style={{ backgroundColor: overlayBackgroundColor }}></div>,
      <div key={`cover-text-${id}`} className="cover-text slide animate-text" style={{ fontSize: '100%' }}>
        {renderOverlay()}
      </div>,
    ];
  }

  renderCountOverlay(more) {
    const { images } = this.props;
    const { countFrom } = this.state;
    const extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);

    return [
      more && <div key="count" className="cover"></div>,
      more && (
        <div key="count-sub" className="cover-text">
          <p>+{extra}</p>
        </div>
      ),
    ];
  }

  render() {
    const { countFrom } = this.state;
    const { images } = this.props;
    const imagesToShow = [...images];

    if (countFrom && images.length > countFrom) {
      imagesToShow.length = countFrom;
    }

    return (
      <GridContainer>
        {[1, 3, 4].includes(imagesToShow.length) && this.renderOne()}
        {imagesToShow.length >= 2 && imagesToShow.length !== 4 && this.renderTwo()}
        {imagesToShow.length >= 4 && this.renderThree()}
      </GridContainer>
    );
  }
}

export default Images;
