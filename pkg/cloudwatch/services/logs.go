package services

import (
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/models"
	resources2 "github.com/appkube/cloud-datasource/pkg/cloudwatch/models/resources"
	"github.com/appkube/cloud-datasource/pkg/cloudwatch/utils"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/cloudwatchlogs"
)

type LogGroupsService struct {
	logGroupsAPI          models.CloudWatchLogsAPIProvider
	isCrossAccountEnabled bool
}

func NewLogGroupsService(logsClient models.CloudWatchLogsAPIProvider, isCrossAccountEnabled bool) models.LogGroupsProvider {
	return &LogGroupsService{logGroupsAPI: logsClient, isCrossAccountEnabled: isCrossAccountEnabled}
}

func (s *LogGroupsService) GetLogGroups(req resources2.LogGroupsRequest) ([]resources2.ResourceResponse[resources2.LogGroup], error) {
	input := &cloudwatchlogs.DescribeLogGroupsInput{
		Limit:              aws.Int64(req.Limit),
		LogGroupNamePrefix: req.LogGroupNamePrefix,
	}

	if s.isCrossAccountEnabled && req.AccountId != nil {
		input.IncludeLinkedAccounts = aws.Bool(true)
		if req.LogGroupNamePattern != nil {
			input.LogGroupNamePrefix = req.LogGroupNamePattern
		}
		if !req.IsTargetingAllAccounts() {
			// TODO: accept more than one account id in search
			input.AccountIdentifiers = []*string{req.AccountId}
		}
	}
	response, err := s.logGroupsAPI.DescribeLogGroups(input)
	if err != nil || response == nil {
		return nil, err
	}

	var result []resources2.ResourceResponse[resources2.LogGroup]
	for _, logGroup := range response.LogGroups {
		result = append(result, resources2.ResourceResponse[resources2.LogGroup]{
			Value: resources2.LogGroup{
				Arn:  *logGroup.Arn,
				Name: *logGroup.LogGroupName,
			},
			AccountId: utils.Pointer(getAccountId(*logGroup.Arn)),
		})
	}

	return result, nil
}
