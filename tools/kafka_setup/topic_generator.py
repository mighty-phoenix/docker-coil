from kafka.admin import (KafkaAdminClient, NewTopic)


admin_client = KafkaAdminClient(bootstrap_servers="localhost:9092")

topic_list = []

# TOPICS
topic_list.append(NewTopic(name="HBOT", num_partitions=1, replication_factor=1))
topic_list.append(NewTopic(name="LUTRA_BACKEND", num_partitions=1, replication_factor=1))

admin_client.create_topics(new_topics=topic_list, validate_only=False)