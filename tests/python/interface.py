import os

from kafka import (KafkaConsumer, KafkaProducer)

outStream = os.popen('head -1 /proc/self/cgroup|cut -d/ -f3')

container_id = outStream.read()
kafkaBrokers = ['localhost:9092']

producer = KafkaProducer(bootstrap_servers=kafkaBrokers)

consumer = KafkaConsumer(
    'HBOT',
    bootstrap_servers=kafkaBrokers,
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id=container_id
)

for message in consumer:
    
    # Show msg from lutra backend
    print(format(message))

    # send msg to lutra backend
    producer.send(
        "LUTRA_BACKEND",
        value=b'Hello from BOT',
        partition=0
    )

    print("Container ID: {}".format(container_id))
