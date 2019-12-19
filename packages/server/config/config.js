module.exports.CONFIG = serverless => ({
  dev: {
    API_NAME: 'wedev-api-dev',
    SECURITY_GROUP_ID: 'sg-00716c37241964512',
    PRIVATE_SUBNET_1: 'subnet-018f7fd8aa3ae2c39',
    PRIVATE_SUBNET_2: 'subnet-0479aca67cf6ca711',
    PRIVATE_SUBNET_3: 'subnet-0ef00aa4fb1674c5b',
  },
  prod: {
    API_NAME: 'wedev-api-prod',
    SECURITY_GROUP_ID: 'sg-00716c37241964512',
    PRIVATE_SUBNET_1: 'subnet-018f7fd8aa3ae2c39',
    PRIVATE_SUBNET_2: 'subnet-0479aca67cf6ca711',
    PRIVATE_SUBNET_3: 'subnet-0ef00aa4fb1674c5b',
  },
  atercatus: {
    API_NAME: 'wedev-api-atercatus',
    SECURITY_GROUP_ID: 'sg-00716c37241964512',
    PRIVATE_SUBNET_1: 'subnet-018f7fd8aa3ae2c39',
    PRIVATE_SUBNET_2: 'subnet-0479aca67cf6ca711',
    PRIVATE_SUBNET_3: 'subnet-0ef00aa4fb1674c5b',
  },
});
