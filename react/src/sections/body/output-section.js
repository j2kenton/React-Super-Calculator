import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const OutputWrapper = styled.div`
  background-color: blue;
`;

const OutputArea = styled.div`
  background-color: yellow;
`;

export const OutputSection = ({ output }) => (
  <OutputWrapper>
    <OutputArea>{output}</OutputArea>
  </OutputWrapper>
);

OutputSection.propTypes = {
  output: PropTypes.number
};

const mapStateToProps = ({ app }) => ({
  output: app.output
});

export default connect(mapStateToProps)(OutputSection);
