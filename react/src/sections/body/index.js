import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { restoreLastFocus } from 'utils/tools';
import { resetForm as resetFormAction } from 'common-actions';
import OutputSection from './output-section';
import InputSection from './input-section';
import NumberButtonSection from './number-button-section';

export const Body = ({ resetForm }) => {
  const [lastBlured, setLastBlured] = useState(null);

  const onBlur = e => {
    setLastBlured(e.target.id);
  };

  const restoreFocus = () => {
    restoreLastFocus(lastBlured);
  };

  const handleKeydown = event => {
    if (event.keyCode === 27) {
      resetForm();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown, false);
  }, []);

  return (
    <section>
      <OutputSection onButtonClick={restoreFocus} />
      <InputSection onBlur={onBlur} onButtonClick={restoreFocus} />
      <NumberButtonSection onButtonClick={restoreFocus} />
    </section>
  );
};

Body.propTypes = {
  resetForm: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  preview: app.preview,
  input: app.input,
  operator: app.operator
});

export default connect(
  mapStateToProps,
  {
    resetForm: resetFormAction
  }
)(Body);
