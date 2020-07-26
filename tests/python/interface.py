from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'HBOT_COMMAND',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='DOCKER_POOL_1'
)

for message in consumer:
    message = message.value
    print('Got message {}'.format(message))
