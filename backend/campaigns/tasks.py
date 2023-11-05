import threading
from .models import Campaign, CampaignAudience, CampaignExecution, CampaignExecutionLog


class Task:

    def execute_campaign(self, campaign_execution_id):
        # get campaign_audience
        Campaign
        # Loop through each email
        # send email
        # create execution log
        # update email count
        pass

    def create_thread(self, campaign_execution_id):
        args = (1,)
        t = threading.Thread(target=Task.execute_campaign(campaign_execution_id), args=args)
        t.setDaemon(True)
        t.start()
