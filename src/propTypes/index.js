import PropTypes from 'prop-types';

const newsLocalizedPropType = PropTypes.shape({
  content: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
});

export const newsPropType = PropTypes.shape({
  imageUrl: PropTypes.string,
  kaz: newsLocalizedPropType,
  rus: newsLocalizedPropType,
});

export const faqLocalizedPropType = PropTypes.shape({
  answer: PropTypes.string,
  date: PropTypes.string,
  question: PropTypes.string,
});

export const faqPropType = PropTypes.shape({
  kaz: faqLocalizedPropType,
  rus: faqLocalizedPropType,
});
