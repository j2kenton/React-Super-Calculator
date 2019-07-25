import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toggleOutputNegativity as toggleOutputNegativityAction } from 'common-actions';

const OutputWrapper = styled.div`
  background-color: blue;
`;

const OutputArea = styled.div`
  background-color: yellow;
`;

const SignButton = styled.button`
  background-color: white;
`;

const NumberArea = styled.span`
  background-color: grey;
`;

export const OutputSection = ({ output, toggleOutputNegativity }) => (
  <OutputWrapper>
    <OutputArea>
      <SignButton onClick={toggleOutputNegativity}>{output < 0 && '-'}</SignButton>
      <NumberArea>{Math.abs(output)}</NumberArea>
    </OutputArea>
  </OutputWrapper>
);

OutputSection.propTypes = {
  output: PropTypes.number,
  toggleOutputNegativity: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  output: app.output
});

export default connect(
  mapStateToProps,
  { toggleOutputNegativity: toggleOutputNegativityAction }
)(OutputSection);
